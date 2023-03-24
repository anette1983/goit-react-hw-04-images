import React from 'react';
import ContentLoader from 'react-content-loader';
// import { Watch } from  'react-loader-spinner'

const Loader = props => (
    <ContentLoader
      viewBox="0 0 400 160"
      height={160}
      width={400}
      color="#3f51b5"
      backgroundColor="#3f51b5"
      style={{ width: '100%' }}
      {...props}
    >
      <circle cx="150" cy="86" r="8" />
      <circle cx="194" cy="86" r="8" />
      <circle cx="238" cy="86" r="8" />
    </ContentLoader>
  )
  
  Loader.metadata = {
    name: 'RioF',
    github: 'clariokids',
    description: 'Three Dots',
    filename: 'ThreeDots',
  }

// {/* <Watch
//   height="80"
//   width="80"
//   radius="48"
//   color="#3f51b5"
//   ariaLabel="watch-loading"
//   wrapperStyle={{
//     display: 'block',
//     margin: '0 auto',
//   }}
//   visible={true}
// /> */}
  
  export default Loader;