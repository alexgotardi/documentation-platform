import chokidar from 'chokidar';
import fs from 'fs-extra';
import path from 'path';
import React, { Component } from 'react';
import { reloadRoutes } from 'react-static/node';
import { ServerStyleSheet } from 'styled-components';
import { buildProjects, getDocPages } from './buildProjects';
import HotJar from './src/components/atoms/HotJar';
import { siteName, hotJarId, siteRoot } from './src/config.json';

const docsFolder = 'docs';

chokidar.watch(`../${docsFolder}`).on('all', () => reloadRoutes());

const webifyPath = (p) => p.replace(/\\/g, '/');

// These are the documentation pages. They can either use the `markdownSrc` to point
// to a markdown file, or they can use `component` to point to a react component
const docPages = getDocPages(docsFolder);

// This is the complete tree of all the documents with meta data like tocs
const projects = buildProjects(docsFolder);

// No need to touch any of this, unless you want to.
export default {
    siteRoot,
    getSiteData: () => ({
        projects,
        siteName
    }),
    getRoutes: () => [
        {
            path: '/',
            component: 'src/containers/Home'
        },
        ...docPages.map(page => ({
            path: page.path,
            component: 'src/containers/Doc',
            getData: async () => ({
                markdown: processMarkdown(page.markdownSrc),
                title: page.title
            })
        })),
        {
            path: '/search',
            component: 'src/containers/Search'
        },
        {
            is404: true,
            path: '/404',
            component: 'src/containers/NotFound'
        }
    ],
    renderToHtml: (render, Comp, meta) => {
        try {
            const sheet = new ServerStyleSheet();
            const html = render(sheet.collectStyles(<Comp />));
            meta.styleTags = sheet.getStyleElement();
            return html;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('ERROR', e);
        }
    },
    Document: class CustomHtml extends Component {
        render() {
            const { Html, Head, Body, children, renderMeta } = this.props;

            return (
                <Html>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1"
                        />
                        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                        <link rel="shortcut icon" href="/favicon/favicon.ico" />
                        <link rel="manifest" href="/favicon/site.webmanifest" />
                        <meta name="apple-mobile-web-app-title" content={siteName} />
                        <meta name="application-name" content={siteName} />
                        <meta name="msapplication-TileColor" content="#ffffff" />
                        <meta name="theme-color" content="#ffffff" />
                        {renderMeta.styleTags}
                        <title>{siteName}</title>
                    </Head>
                    <Body>
                        {children}
                        {hotJarId && (
                            <HotJar id={hotJarId} />
                        )}
                    </Body>
                </Html>
            );
        }
    }
};

function processMarkdown(markdownSrc) {
    let markdown = fs.readFileSync(markdownSrc).toString();
    markdown = assetMarkdownImage(markdown, markdownSrc);
    markdown = assetImg(markdown, markdownSrc);
    markdown = replaceRootUrls(markdown);
    return markdown;
}

function replaceRootUrls(markdown) {
    return markdown.replace(/root:\/\/(.*?)(.md)/g, `/${docsFolder}/$1`);
}

function assetImg(markdown, docPath) {
    const re = /(<img src="(.*?)")/gm;

    let match;
    do {
        match = re.exec(markdown);
        if (match && match.length === 3) {
            try {
                if (!match[2].startsWith('http') && match[2].length > 0) {
                    const imgFilename = path.resolve(path.join(path.dirname(docPath), match[2]));
                    markdown = markdown.replace(match[1], `<img src="/assets/${webifyPath(path.relative('.', imgFilename))}"`);
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(`Missing image ${match[1]} in ${docPath}`, err);
            }
        }
    } while (match);

    return markdown;
}

function assetMarkdownImage(markdown, docPath) {
    const re = /(!\[(.*?)\]\((.*?)\))/gm;

    let match;
    do {
        match = re.exec(markdown);

        if (match && match.length === 4) {
            try {
                if (!match[3].startsWith('http') && match[3].length > 0) {
                    const imgFilename = path.resolve(path.join(path.dirname(docPath), match[3]));
                    markdown = markdown.replace(match[1], `![${match[2]}](/assets/${webifyPath(path.relative('.', imgFilename))})`);
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(`Missing image ${match[3]} in ${docPath}`);
            }
        }
    } while (match);

    return markdown;
}
