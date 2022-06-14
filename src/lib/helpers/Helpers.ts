/* eslint-disable import/prefer-default-export */
import type { V4Options } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

/**
 * @description Creates a universal user ID(UUID).
 * @returns String.
 */
export const getUUID = (options?: V4Options) => {
  return uuidv4(options);
};
