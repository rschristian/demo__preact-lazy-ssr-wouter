import { hydrate } from 'preact';
import { Suspense, lazy } from 'preact/compat';
import { Router, Route, Switch } from 'wouter-preact'
import { renderToString } from 'preact-render-to-string';

import { Header } from './components/Header.jsx';
import './style.css';

const Home = lazy(() => import('./pages/Home/index.jsx'));
const NotFound = lazy(() => import('./pages/_404.jsx'));

export function App(props) {
	return (
		<Suspense fallback={null}>
			<Header />
			<main>
				<Router ssrPath={props.url}>
                    <Switch>
                        <Route path="/" component={Home} />
                        <Route default component={NotFound} />
                    </Switch>
				</Router>
			</main>
		</Suspense>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

// More or less copied straight from `preact-iso`:
// https://github.com/preactjs/preact-iso/blob/6671855b42704a725d7579e43b255d6538cd0ea8/src/prerender.js#L18
export async function prerender(data) {
    const maxDepth = 10;
    let tries = 0;
    
    const render = () => {
		if (++tries > maxDepth) return;
		try {
			return renderToString(<App {...data} />);
		} catch (e) {
			if (e && e.then) return e.then(render);
			throw e;
		}
	};

    try {
        const result = await render();
        console.log('\n' + result)
        return result;
    } catch {} 
}

