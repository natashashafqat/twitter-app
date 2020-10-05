export interface PassportProfile {
  provider: string;
  id: number;
  username: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
    middleName: string;
  };
  emails: [
    {
      value: string;
    }
  ];
  photos: object[];
  _json: object;
}
