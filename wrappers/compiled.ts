import { Cell } from '@ton/core';

import CodeJson from '../build/HighloadWalletV3.compiled.json' assert { type: 'json' };

export const HighloadWalletV3Code: Cell = Cell.fromBoc(Buffer.from((CodeJson as { hex: string }).hex, 'hex'))[0];
