import { getRandomArrayElement } from '../utils';


const mockMovie = [
  {
    id: '0',
    // 'comments': [
    //   $Comment.id$, $Comment.id$
    // ],
    title: 'A Little Pony Without The Carpet',
    totalRating: 5.3,
    poster: 'images/posters/control.jpeg',
    // 'age_rating': 0,
    // 'writers': [
    //   'Takeshi Kitano'
    // ],
    // 'actors': [
    //   'Morgan Freeman'
    // ],
    // 'release': {
    //   'date': '2019-05-11T00:00:00.000Z',
    //   'release_country': 'Finland'
    // },
    // 'duration': 77,
    // 'genre': 'Comedy',
    // 'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
    // 'user_details': {
    //   'watchlist': false,
    //   'already_watched': true,
    //   'watching_date': '2019-04-12T16:12:32.554Z',
    //   'favorite': false
    // }
  },

];

// const mockComments =
//   {
//     'id': '1',
//     'author': 'Ilya O\'Reilly',
//     'comment': 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
//     'date': '2019-05-11T16:12:32.554Z',
//     'emotion': 'smile'
//   };

function getRandomMovie() {
  return (getRandomArrayElement(mockMovie));
}

export {getRandomMovie};
