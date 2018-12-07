import React from "react";
import { SiteData, Link, Head } from "react-static";
import styled from "styled-components";
import Container from './../components/Container'
import Header from './../components/ci/Header'
import Footer from './../components/molecules/Footer'
import EmailSignup from './../components/molecules/EmailSignup'
import ProjectTopicsContainer from './../components/molecules/ProjectTopics'
import CardContainer from './../components/molecules/HomePageCard'
import { HomePageLayout } from './../components/ci/Layouts'
import FloatingMenu from './../components/ci/FloatingMenu'
import contentHomePage from '../contentHomePage.json';
import { maxWidthLayout } from './../components/ci/Layouts'

/*
background-color: red;
width: 280%;
margin-left: -100%;
height: 100px;
*/
import logoImg from "../logo.png";
const Cards = styled.div`
  display: flex;
  flex-align: stretch;
  justify-content: stretch;
  flex-wrap: wrap;
  width: 1000px;
  max-width: 95%;
`;

const CardElement = styled(Link)`
  flex: 1 1 150px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  background: ${props => props.background};
  color: white;
  border-radius: 5px;
  padding: 2vh 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 1rem;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.1s ease-out;
  white-space: nowrap;

  :hover {
    transform: translate(3px, -5px);
    box-shadow: -6px 10px 40px rgba(0, 0, 0, 0.2);
  }
`;
export default () => (
  <SiteData
    render={({ menu, repo, repoURL, repoName }) => (
      <Container>
        <Head>
          <title>Home | {repoName}</title>
        </Head>
        <Header
          headerTitle='Developer Documentation'
          // headerTopLinks={contentHomePage.headerTopLinks}
          topTitles={contentHomePage.headerTopLinks}
        />
        {/*<Cards>
          {
            Object.values(menu).map(({ name, versions }) =>
              <CardElement key={name} to={{ pathname: `/docs/${name}/reference/${Object.keys(versions)[Object.keys(versions).length - 1]}/README`, state: { project: name }}} background="#ff6073">
                {name}
              </CardElement>
            )
          }
        </Cards>*/}
        <div style={{backgroundColor: '#f3f2f1'}}>
        <HomePageLayout style={{backgroundColor: '#f3f2f1', width: '100%', minHeight: '482px', maxWidth: maxWidthLayout, margin: 'auto'}}>

              <div className="left-column">
              </div>
              <div className="right-column" style={{}}>
                  <CardContainer content={contentHomePage.cards} />
              </div>

        </HomePageLayout>
        </div>
        <HomePageLayout style={{ maxWidth: maxWidthLayout, margin: 'auto' }}>
          <div className="left-column" >
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <FloatingMenu styles={{ position: 'fixed', top: '400px'}} />
            </div>
          </div>
          <div className="right-column">
            <ProjectTopicsContainer contentHomePage={contentHomePage}  />
          </div>
        </HomePageLayout>
        <EmailSignup />
        <Footer content={contentHomePage.footer} />
      </Container>
    )}
  />
);
