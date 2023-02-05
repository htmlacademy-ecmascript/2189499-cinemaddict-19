import MenuView from '../view/menu-view.js';
import { render, replace, remove } from '../framework/render.js';
import { FilterType, UpdateType } from '../const.js';

export default class FiltrPresenter {
  #movieModel = null;
  #filterModel = null;
  #filterComponent = null;
  #main = null;
  constructor({filterModel, main}){
    this.#main = main;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {

    const movies = this.#movieModel.movie;

    const filters = {
      all: {
        type: FilterType.ALL,
        name: 'All movies',
        emptyFilmsMessage: 'There are no movies in our database',
        filteredFilms: [...movies]
      },
      watchlist: {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        emptyFilmsMessage: 'There are no movies to watch now',
        filteredFilms: []
      },
      history: {
        type: FilterType.HISTORY,
        name: 'History',
        emptyFilmsMessage: 'There are no watched movies now',
        filteredFilms: []
      },
      favorites: {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        emptyFilmsMessage: 'There are no favorite movies now',
        filteredFilms: []
      }

    };

    movies.forEach((movie) => {
      if (movie.userDetails.watchlist) {
        filters.watchlist.filteredFilms.push(movie);
      }
      if (movie.userDetails.alreadyWatched) {
        filters.history.filteredFilms.push(movie);
      }
      if (movie.userDetails.favorite) {
        filters.favorites.filteredFilms.push(movie);
      }
    });

    return filters;
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new MenuView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#main);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);

  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
