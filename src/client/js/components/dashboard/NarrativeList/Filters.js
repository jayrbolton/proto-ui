// NPM
import {Component, h} from 'preact';

// Components
import {FilterDropdown} from '../../generic/FilterDropdown';
import {SearchInput} from '../../generic/SearchInput';

/* Filter bar for searching and sorting data results
 * methods:
 *   searchBy - set the search value
 *   sortBy - set the sort value
 * callbacks:
 *  - onSetSearch - some filter has been applied to trigger a new search
 */
export class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: {
        term: '',
        sort: null,
      },
    };
  }

  // Handle an onSetVal event from SearchInput
  handleSearch(val) {
    const searchParams = this.state.searchParams;
    searchParams.term = val;
    this.setState({searchParams});
    if (this.props.onSetSearch) {
      this.props.onSetSearch(searchParams);
    }
  }

  // Handle an onSelect event from FilterDropdown
  handleFilter(idx, val) {
    const searchParams = this.state.searchParams;
    searchParams.sort = val;
    this.setState({searchParams});
    if (this.props.onSetSearch) {
      this.props.onSetSearch(searchParams);
    }
  }

  render(props) {
    const dropdownItems = ['Newest', 'Oldest', 'Recently updated', 'Least recently updated'];
    return (
      <div className='bg-light-gray flex justify-between'>
        {/* Left-aligned actions (eg. search) */}
        <div className='pa3'>
          <SearchInput loading={Boolean(props.loading)} onSetVal={this.handleSearch.bind(this)} />
        </div>

        {/* Right-aligned actions (eg. filter dropdown) */}
        <div className='pa2'>
          <FilterDropdown
            onSelect={this.handleFilter.bind(this)}
            txt={'Sorting by'}
            items={dropdownItems} />
        </div>
      </div>
    );
  }
}
