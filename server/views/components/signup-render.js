import Signup from './signup';
import React, {Component} from 'react';
import {hydrate} from "react-dom";

hydrate(
    <Signup/>,            
    document.getElementById("root")
); 