

const mockMovie = [
  {
    'id': '0',
    'comments': [
      1,2
    ],
    'film_info': {
      'title': 'Control',
      'alternative_title': 'Kolobok povesilsa',
      'total_rating': 8.3,
      'poster': 'images/posters/control.jpeg',
      'age_rating': 16,
      'director': 'Anton Corbijn.',
      'writers': [
        'Deborah Curtis'
      ],
      'actors': [
        'Sam Riley', 'Samantha Morton', 'Craig Parkinson'
      ],
      'release': {
        'date': '2007-03-27T00:00:00.000Z',
        'release_country': 'UK'
      },
      'duration': 77,
      'genre': [
        'Drama'
      ],
      'description': 'История Иэна Кертиса, фронтмена британской пост-панковской группы Joy Division. О борьбе между его любовью к жене и бурно развивающимися отношениями с подружкой, об изматывающих приступах эпилепсии, невероятном таланте и всепоглощающих выступлениях на сцене.'
    },
    'user_details': {
      'watchlist': false,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  },


  {
    'id': '1',
    'comments': [
      0
    ],
    'film_info': {
      'title': 'A Little Pony Without The Carpet',
      'alternative_title': 'Laziness Who Sold Themselves',
      'total_rating': 5.3,
      'poster': 'images/posters/blue-blazes.jpg',
      'age_rating': 0,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano'
      ],
      'actors': [
        'Morgan Freeman'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'Finland'
      },
      'duration': 77,
      'genre': [
        'Comedy'
      ],
      'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    'user_details': {
      'watchlist': true,
      'already_watched': true,
      'watching_date': '2022-06-12T16:12:32.554Z',
      'favorite': false
    }
  },


  {
    'id': '2',
    'comments': [
      3,4,5,6
    ],
    'film_info': {
      'title': 'A Little Pony Without The Carpet',
      'alternative_title': 'Laziness Who Sold Themselves',
      'total_rating': 5.3,
      'poster': 'images/posters/blue-blazes.jpg',
      'age_rating': 0,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano'
      ],
      'actors': [
        'Morgan Freeman'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'Finland'
      },
      'duration': 77,
      'genre': [
        'Comedy'
      ],
      'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    'user_details': {
      'watchlist': false,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },


  {
    'id': '3',
    'comments': [
      1,2
    ],
    'film_info': {
      'title': 'A Little Pony Without The Carpet',
      'alternative_title': 'Laziness Who Sold Themselves',
      'total_rating': 5.3,
      'poster': 'images/posters/blue-blazes.jpg',
      'age_rating': 0,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano'
      ],
      'actors': [
        'Morgan Freeman'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'Finland'
      },
      'duration': 77,
      'genre': [
        'Comedy'
      ],
      'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    'user_details': {
      'watchlist': false,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },


  {
    'id': '4',
    'comments': [
      1,2
    ],
    'film_info': {
      'title': 'A Little Pony Without The Carpet',
      'alternative_title': 'Laziness Who Sold Themselves',
      'total_rating': 5.3,
      'poster': 'images/posters/blue-blazes.jpg',
      'age_rating': 0,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano'
      ],
      'actors': [
        'Morgan Freeman'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'Finland'
      },
      'duration': 77,
      'genre': [
        'Comedy'
      ],
      'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    'user_details': {
      'watchlist': false,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },


  {
    'id': '5',
    'comments': [
      1,2
    ],
    'film_info': {
      'title': 'A Little Pony Without The Carpet',
      'alternative_title': 'Laziness Who Sold Themselves',
      'total_rating': 5.3,
      'poster': 'images/posters/blue-blazes.jpg',
      'age_rating': 0,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano'
      ],
      'actors': [
        'Morgan Freeman'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'Finland'
      },
      'duration': 77,
      'genre': [
        'Comedy'
      ],
      'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    'user_details': {
      'watchlist': false,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
];

const mockComments =
  {
    'id': '1',
    'author': 'Ilya O\'Reilly',
    'comment': 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  };
