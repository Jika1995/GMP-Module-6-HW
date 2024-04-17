import { readFileSync, writeFileSync } from 'fs';

export const readDataFromFile = (filename: string) => {
  try {
    const data = readFileSync(filename, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return err
  }
}

export const writeDataToFile = (filename: string, content: any) => {
  try {
    writeFileSync(filename, JSON.stringify(content), 'utf-8');
  } catch (err) {
    console.log(err);
  }
}

export const parseRequestBody = (req: any) => new Promise((resolve, reject) => {
  let body = '';

  req.on('data', (chunk: any) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    resolve(JSON.parse(body));
  });

  req.on('error', (error: Error) => {
    reject(error);
  });
});