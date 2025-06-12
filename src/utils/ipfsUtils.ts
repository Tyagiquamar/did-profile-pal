
import { create } from 'ipfs-http-client';

// Using a public IPFS gateway for demo purposes
const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

export interface DIDDocument {
  '@context': string[];
  id: string;
  verificationMethod: Array<{
    id: string;
    type: string;
    controller: string;
    publicKeyJwk: JsonWebKey;
  }>;
  authentication: string[];
  assertionMethod: string[];
  created: string;
  updated: string;
}

export const uploadToIPFS = async (data: any): Promise<string> => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const result = await ipfs.add(jsonString);
    console.log('Uploaded to IPFS:', result.path);
    return result.path;
  } catch (error) {
    console.error('IPFS upload failed:', error);
    // Fallback to localStorage for demo
    const hash = `local_${Date.now()}`;
    localStorage.setItem(`ipfs_${hash}`, JSON.stringify(data));
    return hash;
  }
};

export const downloadFromIPFS = async (hash: string): Promise<any> => {
  try {
    if (hash.startsWith('local_')) {
      const data = localStorage.getItem(`ipfs_${hash}`);
      return data ? JSON.parse(data) : null;
    }

    const stream = ipfs.cat(hash);
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const data = new TextDecoder().decode(new Uint8Array(chunks.flat()));
    return JSON.parse(data);
  } catch (error) {
    console.error('IPFS download failed:', error);
    return null;
  }
};

export const createDIDDocument = (
  did: string, 
  publicKeyJwk: JsonWebKey
): DIDDocument => {
  const now = new Date().toISOString();
  
  return {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/jws-2020/v1'
    ],
    id: did,
    verificationMethod: [{
      id: `${did}#key-1`,
      type: 'JsonWebKey2020',
      controller: did,
      publicKeyJwk
    }],
    authentication: [`${did}#key-1`],
    assertionMethod: [`${did}#key-1`],
    created: now,
    updated: now
  };
};
