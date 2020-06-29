import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { createLoadingSelector } from '../../Selectors';
import ActiveSprints from './ActiveSprints';
import { Card, CardHeader } from 'shards-react';
import Loader from 'react-loader-spinner';

const ActiveSprintsContainer = ({
  sprints: { sprints },
  projects: { projects },
  isLoading,
}) => {
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    setSkip(true);
  }, []);

  return skip && !isLoading ? (
    <Card small className='h-100'>
      <CardHeader className='border-bottom'>
        <h6 className='m-0'>Active Sprints</h6>
      </CardHeader>
      <ActiveSprints sprints={sprints} projects={projects} />
    </Card>
  ) : (
    <Card small className='h-100'>
      <CardHeader className='border-bottom'>
        <h6 className='m-0'>Active Sprints</h6>
      </CardHeader>
      <Loader
        type='Oval'
        color='#007bff'
        height={50}
        width={50}
        className='center-short'
      />
    </Card>
  );
};
const loadingSelector = createLoadingSelector(['GET_SPRINTS', 'GET_PROJECTS']);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  projects: state.projects,
  sprints: state.sprints,
});

export default connect(mapStateToProps)(ActiveSprintsContainer);
