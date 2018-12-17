import path from 'path';
import express from 'express';
import posthtml from 'express-posthtml';
import csp from 'express-csp-header';
import nonce from 'posthtml-nonce';

const app = express();
const options = {};

app.engine('html', posthtml);
app.set('view engine', 'html');
app.set('views', './views');
app.set('view options', { options });
app.use('/static', express.static(__dirname + '/static'));

app.use(csp({
    policies: {
        'default-src': [csp.SELF],
        'frame-src': [csp.SELF, csp.NONCE]
    }
}));

app.get('/', (req, res) => {
	res.render('index', {
		plugins: [
			nonce({tags: ['iframe'], nonce: req.nonce})
		]
	});
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});