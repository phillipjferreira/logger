import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { createLoadingSelector } from '../../Selectors';
import ActiveSprints from './ActiveSprints';
import { Col, Card, CardHeader } from 'shards-react';
import { loadSprints } from '../../actions/sprints';

const ActiveSprintsContainer = ({
  sprints: { sprints },
  projects: { projects },
  loadSprints,
  isLoading,
}) => {
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    setSkip(true);
  }, []);

  return (
    skip &&
    !isLoading && (
      <Fragment>
        <Col sm='12' md='6' className='mb-4'>
          <Card small className='h-100'>
            <CardHeader className='border-bottom'>
              <h6 className='m-0'>Active Sprints</h6>
            </CardHeader>
            <ActiveSprints sprints={sprints} projects={projects} />
          </Card>
        </Col>
      </Fragment>
    )
  );
};
const loadingSelector = createLoadingSelector(['GET_SPRINTS']);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  projects: state.projects,
  sprints: state.sprints,
});

export default connect(mapStateToProps, { loadSprints })(
  ActiveSprintsContainer
);
