import React from 'react';
import Layout from '@theme/Layout';

export default function About() {
  return (
    <Layout>
      <div style={{textAlign:'center', height: '50vh'}}>
        <div>
          <h1>
            {"About Me"}
          </h1>
        </div>
        <br /><br />
        <div>
          <h3>
            🚧 🔨 {"Under Contruction... Come back soon!"} 🔨 🚧
          </h3>
        </div>
      </div>
      {/*<h1>About Me</h1>

      <h2>Work Experience</h2>

      <h2>Education</h2>
      <p>This is a React page</p> */}
    </Layout>
  );
}