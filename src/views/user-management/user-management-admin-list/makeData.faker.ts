import { faker } from '@faker-js/faker';
import { uniqueId } from 'lodash';
import { RVUserManagementAdminListUserEntity } from './UserManagementAdminList';

const range = (len: number) => {
  const arr: number[] = [];
  const startingFrom = len;
  for (let i = startingFrom; i < len + startingFrom; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): RVUserManagementAdminListUserEntity => {
  return {
    UserID: uniqueId(),
    UserName: faker.random.alphaNumeric(8),
    FirstName: faker.person.firstName(),
    LastName: faker.person.lastName(),
    ImageURL: faker.image.avatar(),
    ProfileImageURL: faker.image.avatar(),
    LastActivityTime: faker.date.anytime(),
    IsApproved: faker.datatype.boolean(),
    IsLockedOut: faker.datatype.boolean(),
    IsSystemAdmin: faker.datatype.boolean(),
    Confidentiality: faker.helpers.arrayElement([
      { LevelID: '3', ConfidentialityID: 'conf-1', Title: 'General', ID: 'conf-3' },
      { LevelID: '2', ConfidentialityID: 'conf-2', Title: 'Sargent', ID: 'conf-2' },
      { LevelID: '1', ConfidentialityID: 'conf-3', Title: 'Soldier', ID: 'conf-1' },
      undefined,
    ]),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): RVUserManagementAdminListUserEntity[] => {
    const len = lens[depth]!;
    return range(len).map((): RVUserManagementAdminListUserEntity => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}
