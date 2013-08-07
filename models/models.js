var mongoose = require('mongoose');

mongoose.connect( 'mongodb://localhost/littledragon' );

var model = function(name, schema){
    return mongoose.model( name, new mongoose.Schema(schema,{strict: true} ) );
};

exports.users = model( 'users', {
    name: {type: String, default: '', trim: true},
    username: {type: String, default: '', trim: true},
    password: {type: String, default: '', trim: true},
    admin: {type: Boolean, default: false },
    facilityAdmin: {type: Boolean, default: false}} );

exports.parents = model( 'parents', {
    _user: {type: mongoose.Schema.ObjectId, ref: 'users'},
    _children: [{type: mongoose.Schema.ObjectId, ref: 'children'}]} );

exports.children = model( 'children', {
    name: {type: String, default: '', trim: true},
    _parent: {type: mongoose.Schema.ObjectId, ref: 'parents'} } );

//users( {name:'Peter Reid', username:'preid', password:'peter'} ).save();

/*
blogs =  model 'blogs',
	name:
		type: String
		default: ''
	description:
		type: String
		default:''
	users:
		type: mongoose.Schema.ObjectId
		ref: 'users'

posts = model 'posts',
	title:
		type: String
		default: ''
	body:
		type: String
		default: ''
	published:
		type: Date
	blogs:
		type: mongoose.Schema.ObjectId
		ref: 'blogs'*/
