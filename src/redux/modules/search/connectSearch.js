import { connect } from 'react-redux';
import { searchActionCreators } from './actions';

function mapStateToProps({ search }) {
  return {
    search
  };
}

const mapDispatchToProps = searchActionCreators;

export function connectSearch(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
