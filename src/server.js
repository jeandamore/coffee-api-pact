'use strict';

import Api from './api';

new Api(process.env.PORT || 4567).start();