import axios from 'axios'
import { publicConfig, serverConfig } from "configuration/app";

const client = axios.create({
  baseURL: publicConfig.platform.url
})

export async function authorizeServiceAccount(): Promise<string> {
  const response = await client.post('/authorize/serviceAccount', {
    tenantId: serverConfig.platform.tenantId,
    apiKey: serverConfig.platform.apiKey,
    email: serverConfig.platform.serviceAccount
  }).catch(err => {
    throw new Error(err?.response?.data?.message);
  })
  return response.data.accessToken
}
