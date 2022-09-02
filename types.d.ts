export interface Video {
  caption: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  _id: string;
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  likes: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
    };
  }[];
  userId: string;
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

export interface GoogleCredential {
  name: string
  picture: string
  sub: string
}

export interface PostPayload {
  _type: 'post' | 'comment',
  caption: string
  category: string
  video: {
    _type: 'file' | '',
    asset: {
      _type: 'reference' | '',
      _ref: string
    }
  },
  userId: string,
  postedBy: {
    _type: 'postedBy' | '',
    _ref: string
  },
  topic: string}