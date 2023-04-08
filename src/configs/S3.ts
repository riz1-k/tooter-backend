import * as AWS from 'aws-sdk';

import env from '../loaders/env';

AWS.config.credentials = new AWS.Credentials(
  env.WASABI_ACCESS_KEY,
  env.WASABI_SECRET_ACCESS_KEY
);

AWS.config.update({
  region: 'ap-southeast-1',
});

const endpoint = new AWS.Endpoint('s3.wasabisys.com');
const s3 = new AWS.S3({ endpoint });

export default s3;
