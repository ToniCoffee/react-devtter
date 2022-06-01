// import 'styles/global.css';

import AppLayout from 'components/app-layout';

function App({ Component, pageProps }) {
	return <AppLayout>
		<Component {...pageProps} />
	</AppLayout>;
}

export default App;
