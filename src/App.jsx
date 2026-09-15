import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Pipeline from './components/Pipeline';
import Validation from './components/Validation';
import Technology from './components/Technology';
import Explainability from './components/Explainability';
import Demo from './components/Demo';
import FAQ from './components/FAQ';
import PilotForm from './components/PilotForm';

export default function App() {
  return (
    <Layout>
      <Hero />
      <Problem />
      <Pipeline />
      <Validation />
      <Technology />
      <Explainability />
      <div id="demo">
        <Demo />
      </div>
      <FAQ />
      <PilotForm />
    </Layout>
  );
}
