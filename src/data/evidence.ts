import { driveFile, driveFolder } from './documentary';

// Carpetas verificadas de cada mesa. Las evidencias NO están enlazadas aún a
// un identificador de nodo individual: evitar atribuciones documentales falsas.
const mesaSources: { diagnosis: string; evidence: string; report: string }[] = [
  { diagnosis: '1dE3F4fdZsrpZiEqZwMiDne23nIxXjReW', evidence: '12gNZYf01vVzq7Rx87yWMze7Vg6pQMeCe', report: '1KjO97IVvIrGCTHAdvKkLIplwOOmg69qg' },
  { diagnosis: '1Or_mA7BRPJ4detbXxnGMIdhyQDu-Lz7K', evidence: '1vf2xoovpd9sAwWFf1zNNFvbd8OqRKS_E', report: '130j2YxzR9uwAQI9b9SyfhJU4fHb2xmEK' },
  { diagnosis: '1dp7u2GvyoC4HHWG8yEvJLAlD6niOwRPN', evidence: '1zEE55eXz6msTS3_e98MWkxToDLoBSfwk', report: '1zmbqzgAczpjxPf2e8UXi72NJ9PLRAiZ2' },
  { diagnosis: '1GMYj-xJiDMtpdvRs9IgirCncsH0biZ4Z', evidence: '1k63WpEiOm0WWUB2iv_gERK52fL6lvRZk', report: '1B_jc7xOUYVNAiFIpdqSpBg_RFY8Zr1HO' },
  { diagnosis: '1FUZjxE0XhYu43lBqKN8rJqluyF8Emi4d', evidence: '1HObh6LgvyqozeeeuvDXyWIU2gJO70Tot', report: '10KH3YsucIpzpoM9eJsY3aRxGNvTfUE_S' },
  { diagnosis: '1zHGojGuLY9r4Wap9DY5lyxT6iZ1R89ME', evidence: '1PxdALvQAMlISxUHYLQBKHHagUiYxgBxc', report: '1sKY80l0YAILUr5VNzv8KmqOKlAKtUw4k' },
  { diagnosis: '1YXjxA8bGg6B1_-QXShZ1ligW_oV47IQt', evidence: '1Mm0Lso3SPFx--MGUi6Nrba20PT2Zb5A0', report: '1mjtdJ_9BhdNiFQEzuKuznTkYjuv_-I5f' },
  { diagnosis: '1k7myGZ99pl_SsEE7pFmhMJ7MI4ZAsv_3', evidence: '1fb8uAfPcw_6t74O1gTW0o0JWXUWWVbPB', report: '1_TuRDL_qHLTb3Pqdm_XT-xB0g48Th77f' },
  { diagnosis: '13OSEhLAJax0B7t3iwN1OH5Y2K_hpfcJV', evidence: '1OLJEUwIWcNc9vBfwNvFQ63qVwL6A_SJS', report: '1-12ytjvC32uxKh8r0AL709HPm2EwTdTe' },
  { diagnosis: '1yc2uCDFo32cS5Z3HUux3fxyn87JrLwSz', evidence: '1rcnCyjfS0nE5w1NoK-sl-_UuBc1ZEKU8', report: '1N0B-RpYST0LIy4gK89rrCaccia_iBVyv' },
  { diagnosis: '1_7Q8x__5s2LgFIXU6c7PMcqSE3aaCbng', evidence: '1dOjDYlJfMffpjOdcJ7iQDhsumNQIjMI-', report: '10_gO8kDcNW049oU4eUOtiW7nhX_iLu-4' },
];

export function sourcesForTree(treeId: string) {
  const num = Number(treeId.replace(/[^0-9]/g, ''));
  return sourcesForMesa(num);
}

export function sourcesForMesa(num: number) {
  const record = mesaSources[num - 1];
  return record ? {
    diagnosisFolder: driveFolder(record.diagnosis),
    evidenceFolder: driveFolder(record.evidence),
    narrative: num === 11 ? driveFile(record.report) : 'https://docs.google.com/document/d/' + record.report + '/edit',
  } : null;
}
