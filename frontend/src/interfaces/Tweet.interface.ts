export interface Tweet {
  tweet: {
    data: {
      author_id: number;
      id: number;
      text: string;
    },
    includes: {
      users: [
        {
          id: number;
          name: string;
          username: string;
        }
      ]
    }
  }
};