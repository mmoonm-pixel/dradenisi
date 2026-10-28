import {chromium} from 'playwright';
import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
export const baseURL=process.env.TEST_BASE_URL||'http://localhost:3000';
const output=new URL('./artifacts/',import.meta.url);await mkdir(output,{recursive:true});
export const artifact=name=>fileURLToPath(new URL(name,output));
export function launchBrowser(){return chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{}),args:process.env.CI?['--no-sandbox']:[]})}
