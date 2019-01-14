import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'
 
...
import TagManager from 'react-gtm-module'
 
const tagManagerArgs = {
    gtmId: 'GTM-000000'
}
 
TagManager.initialize(tagManagerArgs)
...