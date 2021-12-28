export const categories = [
  {
    name: 'Old Hollywood',
    image: 'https://swashvillage.org/storage/img/images_2/humphrey-bogart-biography_2.jpg',
  },
  {
    name: 'Music',
    image: 'https://a.1stdibscdn.com/archivesE/upload/a_516/33_15/0337_1725/0337_1725-1.jpeg'
  },
  {
    name: `Daily life`,
    image: 'https://d3m2ca683sarz5.cloudfront.net/wp-content/uploads/2018/06/26080518/50s12.jpg',
  },
  {
    name: 'Royal Family',
    image: 'https://th.bing.com/th/id/R.b14c73a01310af5e13cb5237427c1ca9?rik=CYFlofJ7U0%2bI0Q&pid=ImgRaw&r=0',
  },
  {
    name: 'War',
    image: 'https://cdn.cnn.com/cnnnext/dam/assets/181107171032-02-ww2-us-german-vets-painting-tank-super-tease.jpg',
  },
  {
    name: 'Fashion',
    image: 'https://media.vogue.es/photos/5cc720a98f6f6717335b8c57/1:1/w_900,h_900,c_limit/recordamos_la_figura_de_audrey_hepburn_en_el_20_aniversario_de_su_muerte_632549946.jpg',
  }, {
    name: 'Vintage illustrations',
    image: 'https://i.pinimg.com/564x/47/c0/0c/47c00c48929b8d543e50f146a14b5ead.jpg',
  },
  {
    name: 'others',
    image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  },
];

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}' ]`;

  return query;
}

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*' ]{
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }`

  return query
}

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) {
    image {
        asset -> {
            url
        }
    },
    _id,
    destination,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[] {
        _key,
        postedBy -> {
            _id,
            userName,
            image
        },
    },
}`

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userBanner = (userId) => {
  const query = `*[ _type == 'banner' && userId == '${userId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    postedBy->{
      _id,
      userName,
      image
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

