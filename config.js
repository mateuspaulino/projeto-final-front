
const PWD = "pf";

const Defaults = {	
	// s3URL:''+PWD+'/',
	s3URL:''+PWD+'/',
	qaURL:''+PWD+'/',

	isIllustrator: false,
	isPlaybuzz: false,
}

const Paths = {
	images:'static/img/**/*.{jpg,png,gif,svg}',
	styles:['static/css/*.css','static/css/componentes/*.css'],
	scripts:['static/js/*.js','static/js/**/*.js','!node_modules/**'],
	views:['templates/*.html','static/view/*.html']
}

export { Defaults, Paths }





