/* eslint-disable no-console */
/* There is no way to import file from root, so had to disable it */

import { gql } from '@apollo/client';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { i18n, localeMapping } from 'configuration/app';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { print } from 'graphql';
import invert from 'lodash/invert';
import merge from 'lodash/merge';
import { join } from 'path';
import { checkSync, lockSync } from 'proper-lockfile';
import { apolloClient } from 'scripts/apollo-client';
import { extractJsonKeys } from 'scripts/extract-json-keys';

const translationsBasePath = join(process.cwd(), 'public', 'locales');
const keysToNamespaceMapping = {};

const localeReverseMapping = invert(localeMapping);

const getLockOnFile = (filePath: string) =>
  new Promise<() => void>((resolve, reject) => {
    let retryCount = 0;
    const interval = setInterval(() => {
      try {
        retryCount++;
        if (!checkSync(filePath)) {
          const releaseLockInstance = lockSync(filePath);
          clearInterval(interval);
          return resolve(releaseLockInstance);
        }
        if (retryCount === 6) {
          clearInterval(interval);
          return reject(new Error("Couldn't resolve lock on File " + filePath));
        }
      } catch (err) {
        if (retryCount === 6) {
          clearInterval(interval);
          return reject(err);
        }
      }
    }, 10);
  });

const getFileContent = async (filePath: string) => {
  const releaseLockInstance = await getLockOnFile(filePath);
  const fileContent = JSON.parse(readFileSync(filePath, 'utf-8'));
  releaseLockInstance();
  return fileContent;
};

const putContentToFile = async (filePath: string, data: string): Promise<void> => {
  const releaseLockInstance = await getLockOnFile(filePath);
  writeFileSync(filePath, data);
  releaseLockInstance();
  return;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateTranslationsFile = async (filePath: string, obj: any) => {
  const currentContent = await getFileContent(filePath);

  const updatedObj = merge(currentContent, obj);

  await putContentToFile(filePath, JSON.stringify(updatedObj, undefined, 2));
};

interface NamespaceDetailsInterface {
  namespaceFileName: string;
  namespaceFilePath?: string;
}

const getNameSpaceDetails = (namespace: string, givenLocale: string, returnPath = false): NamespaceDetailsInterface => {
  const namespaceFileName = `${namespace}.json`;
  const detailsObject: NamespaceDetailsInterface = {
    namespaceFileName,
  };
  if (returnPath) {
    detailsObject.namespaceFilePath = join(
      translationsBasePath,
      localeReverseMapping[givenLocale] || givenLocale,
      namespaceFileName,
    );
  }
  return detailsObject;
};

const getObjectFromNestedKey = (splittedKey: string[], value: string) => {
  const obj = {};
  let container = obj;
  splittedKey.forEach((k, i, values) => {
    container = container[k] = i === values.length - 1 ? value : {};
  });
  return obj;
};

export interface GlossaryDataInterface {
  key: string;
  glossaryValues: {
    data: {
      locale: string;
      value: string;
    }[];
  };
}

const createLoadedTranslationsObject = (loadedTranslations,namespaceFilePath,key,value) => {
  const splittedKey = key.split('.');
  const isNestedKey = splittedKey.length > 1;
  const loadedTranslationsNamespace = loadedTranslations[namespaceFilePath];
  if(isNestedKey && !loadedTranslationsNamespace){
    loadedTranslations[namespaceFilePath] = getObjectFromNestedKey(splittedKey, value);
  }
  if(!isNestedKey && !loadedTranslationsNamespace){
    loadedTranslations[namespaceFilePath] = { [key]: value };
  }
  if(isNestedKey && loadedTranslationsNamespace){
    merge(loadedTranslations[namespaceFilePath], getObjectFromNestedKey(splittedKey, value));
  }
  if(!isNestedKey && loadedTranslationsNamespace){
    loadedTranslations[namespaceFilePath][key] = value;

  }
  return loadedTranslations[namespaceFilePath];
}

const addTranslations = async (glossaryData: GlossaryDataInterface[]) => {
  const loadedTranslations = {};

  for (const set of glossaryData) {
    const { key } = set;
    if (set.glossaryValues?.data) {
      for (const glossaryDetail of set.glossaryValues.data) {
        const { locale, value } = glossaryDetail;
        for (const ns of keysToNamespaceMapping[key]) {
          const { namespaceFilePath } = getNameSpaceDetails(ns, locale, true);
          loadedTranslations[namespaceFilePath] = createLoadedTranslationsObject(loadedTranslations,namespaceFilePath,key,value);
        }
      }
      for (const translationFilePath in loadedTranslations) {
        if (loadedTranslations[translationFilePath]) {
          await updateTranslationsFile(translationFilePath, loadedTranslations[translationFilePath]);
        }
      }
    }
  }
};

const logMissingKeys = async (glossaryData, keysToFetch) => {
  const glossaryKeys = glossaryData.map(e => e.key);
  keysToFetch.filter(key => {
    if (!glossaryKeys.includes(key)) {
      // eslint-disable-next-line no-console
      console.info(`${key}`);
    }
  });
}

const loadTranslations = async (): Promise<void> => {
  const i18nNamespaces = [i18n.defaultNS || 'common'];
  const supportedLocales = i18n.locales || ['en-US', 'de-DE'];
  for (const currentLocale of supportedLocales) {
    const translationsPathForCurrentLocale = join(translationsBasePath, currentLocale);
    const fileNames = readdirSync(translationsPathForCurrentLocale);

    const keysToFetch = [];


    // works on the following assumptions.
    // 1) Both locales will have the same keys. Which should also ideally be the case, until code is conditionally driven on locale.
    // i18nNamespaces can have duplicates (erroneously), not considering that case for now.
    for (const namespace of i18nNamespaces) {
      const { namespaceFileName, namespaceFilePath } = getNameSpaceDetails(namespace, currentLocale, true);
      if (fileNames.includes(namespaceFileName)) {
        const fileContents = await getFileContent(namespaceFilePath);
        const keysInFile = extractJsonKeys(fileContents);
        keysInFile.forEach((key) => {
          if (keysToNamespaceMapping[key]) {
            keysToNamespaceMapping[key].push(namespace);
          } else {
            keysToNamespaceMapping[key] = [namespace];
          }
        });
        keysToFetch.push(...keysInFile);
      } else {
        throw new Error(`No translation file was found at public/locales/${currentLocale} for ${namespace} namespace`);
      }
    }

    const chunksArray = [];
    const chunkSize = parseInt(process.env.TRANSLATION_LOAD_CHUNK_SIZE,10);
    for (let i = 0; i < keysToFetch.length; i += chunkSize) {
        const chunk = keysToFetch.slice(i, i + chunkSize);
        chunksArray.push(chunk);
        // do whatever
    }



    let result: ApolloQueryResult<{ glossaries: { data: GlossaryDataInterface[] } }>;
    let currentChunk = 0;
    for(const keysChunk of chunksArray){
      currentChunk++;
      const requestObj = {
        query: gql`
          query Glossary($keys: [String!]!, $locales: [String!]) {
            glossaries(filter: { key: { valueIn: $keys } }) {
              totalCount
              data {
                key
                glossaryValues(filter: { locale: { valueIn: $locales } }) {
                  data {
                    locale
                    value
                  }
                }
              }
            }
          }
        `,
        variables: { keys: keysChunk, locales: [localeMapping[currentLocale] || currentLocale] },
      };

      result = await apolloClient().query(
        requestObj,
      );

      console.log('*******-------Request Object-------*******');
      console.log('query: %s variables: %o', print(requestObj.query), requestObj.variables);
      console.log('*******-------Request Object-------*******');

       // At build time we always ship running things, with values.
      // So all we need to do is fail the build at every possible error.
      // At runtime, we always have fallback caches, at every step for every next build while using ISR.

      if (result && result.data) {
        // eslint-disable-next-line no-console
        console.log(`******* Processing ${currentLocale} Chunk ${currentChunk}`)
        const dataInResult = result.data;
        if (dataInResult.glossaries && dataInResult.glossaries.data) {
          const glossaryData = dataInResult.glossaries.data;
          // eslint-disable-next-line no-console
          console.log(`******* Missing ${currentLocale} keys *******`);
          await logMissingKeys(glossaryData, keysChunk);
          await addTranslations(glossaryData);
        }
      }

    }

  }
};


(async () => {
  await loadTranslations();
})().catch((err) => {
  console.log('*******-------Error-------*******');
  console.error(err);
  console.log('*******-------Error-------*******');
  process.exit(1);
});
