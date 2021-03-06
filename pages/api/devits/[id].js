import { firestore } from '_firebase/admin';

export default (req, res) => {
  const { query } = req;
  const { id } = query;

  firestore
    .collection('devits')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data();

      res.json({
        ...data,
        id: doc.id,
        createdAt: +data.createdAt.toDate()
      });
    })
    .catch(() => {
      res.status(404).end();
    });
};