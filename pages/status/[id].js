import { Devit } from 'components/devit';
import { useRouter } from 'next/router';
import { firestore } from '_firebase/admin';

export default function DevitPage(props) {
	// if(!props.id) return 'Loading ...';
	
	const router = useRouter();
	if(router.isFallback) return <h1>Cargando ...</h1>;

	return (
		<>
			<Devit {...props} />
			<style jsx>{''}</style>
		</>
	);
}

export async function getStaticPaths() {
	return {
		paths: [ { params: { id: 'zt1MeNtSe6SZ04W2yDFn' } } ],
		fallback: true
	};
}

export async function getStaticProps(context) {
	const { params } = context;
	const { id } = params;

	return firestore
		.collection('devits')
		.doc(id)
		.get()
		.then(doc => {
			const data = doc.data();

			const props = {
				...data,
				id: doc.id,
				createdAt: +data.createdAt.toDate()
			};
			return { props };
		})
		.catch(() => {
			return { props: {} };
		});
}

/* export async function getServerSideProps(context) {
	const { params, res } = context;
	const { id } = params;

	const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`);
	
	if(apiResponse.ok) {
		const props = await apiResponse.json();
		return { props };
	}

	if(res) {
		res.writeHead(404).end();
		// res.writeHead(301, { location: '/home' }).end();
	}
} */

/* DevitPage.getInitialProps = (context) => {
	const { query, res } = context;
	const { id } = query;
	return fetch(`http://localhost:3000/api/devits/${id}`)
		.then(response => {
			if(response.ok) return response.json();
			if(res) {
				res.writeHead(404).end();
				// res.writeHead(301, { location: '/home' }).end();
			}
		});
}; */