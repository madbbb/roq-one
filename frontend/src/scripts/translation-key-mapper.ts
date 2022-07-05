import { createWriteStream, renameSync, unlinkSync } from 'fs';
import { resolve } from 'path';

/* eslint-disable @roq/imports-should-follow-conventions */
import { TRANSLATION_MAPPING } from '../configuration/common/translation-mapping';
/* eslint-enable @roq/imports-should-follow-conventions */


const baseFileName = 'translation-mapping';
const baseFilePath = resolve('src/configuration/common');

const writeStream = createWriteStream(resolve(baseFilePath, baseFileName+'-temp.ts'))

/* 
Rename the old file and write the new content to the new file
*/

const appendComments = () => {
  const errorCodeContextComment = [`\n/* TRANSLATION HELPER::DO NOT REMOVE `];
  writeStream.write('export enum TRANSLATION_MAPPING  {');
  for (const errorCode in TRANSLATION_MAPPING) {
    if (TRANSLATION_MAPPING[errorCode]) {
      writeStream.write(`\n ${errorCode} = '${TRANSLATION_MAPPING[errorCode]}',`);
      errorCodeContextComment.push(`t('${TRANSLATION_MAPPING[errorCode]}') `);
    }
  }
  writeStream.write(`\n}`);
  errorCodeContextComment.push('*/');
  for (const translationCommentHints of errorCodeContextComment) {
    writeStream.write(translationCommentHints + '\n');
  }

  writeStream.end();
  unlinkSync(resolve(baseFilePath, baseFileName+'.ts'));
  renameSync(resolve(baseFilePath, baseFileName+'-temp.ts'), resolve(baseFilePath, baseFileName+'.ts'));

}

(async () => {
  await appendComments();
  console.info('Appended comments');
})().catch(err => {
  console.error('The error while adding comments for dynamic translation key names is', err);
  process.exit(1);
})
