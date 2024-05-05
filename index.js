const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const port = 3000;
const dataProject = require('./assets/js/data');
const config = require('./config/config.json');
const {Sequelize, QueryTypes, where, DataTypes} = require('sequelize');
const sequelize = new Sequelize(config.development);
const projectModel = require('./models').project;
const userModel = require('./models').user;
const bycript = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const upload = require('./middlewares/uploadFile');
const moment = require('moment');
const {calculateDate} = require('./function/calculateDate');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'))

app.use('/assets', express.static(path.join(__dirname, '/assets')))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


app.use(express.urlencoded({extended : false}));
//donwload dotenv
app.use(session({
    name : "mysession",
    secret : "koderahasia",
    resave: false,
    saveUninitialized: true,
    cookie : {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(flash())

app.get('/', home);
app.get('/project', project);
app.post('/project', upload.single('image'), addProject)
app.get('/project-detail/:id', projectDetail)
app.delete('/project/:id', deleteProject);
app.post('/project/:id', upload.single('image'), editProject )
app.get('/testimonials', testimonials)
app.get('/contact-form', contact)
app.get('/edit-project/:id', editProjectView) 
 
app.get("/login", loginView)
app.get("/register", registerView)

app.post('/register', register)
app.post('/login', login)
app.get('/logout', logout)

async function login(req, res) {
    const {email, password} = req.body;  

    const user = await userModel.findOne({
        where : {email}
    });

    if(!user) { 
        req.flash('danger', 'Email or Password is wrong')
        return res.redirect('/login')
    }

    const isPasswordValid = await bycript.compare(password, user.password);
    if(!isPasswordValid) {
        req.flash('danger', 'Email or Password is wrong')
        return res.redirect('/login')
    }

    req.session.isLogin = true;
    req.session.user = {
        id : user.id,
        name : user.name,
        email : user.email
    }

    req.flash('success', 'Login Berhasil!')
    res.redirect('/');

}

async function register(req, res) {
  const {name, email, password} = req.body;
  if(name === '' || email === '' || password === ''){
    return console.log('Lengkapi kolom yang kosong');
  }

  const salt = 10
  const hashedPassword = await bycript.hash(password, salt)

//   const query = `insert into users (name, email, password, "createdAt", "updatedAt") values ('${name}', '${email}', '${hashedPassword}', '2024-05-04', '2024-05-10')`;
//   const data = await sequelize.query(query, {type : QueryTypes.INSERT})

 const data = await userModel.create({
    name,
    email,
    password : hashedPassword
 })

 res.redirect('login')
}


async function logout(req, res) {
    req.session.destroy(function(err){
        if(err) return console.error('Logout Failed!');

        console.log('Logout sucesss!')
        res.redirect('/')
    })
}


function loginView(req, res) {
    const isLogin = req.session.isLogin;
    res.render('login', {isLogin})
}

function registerView(req, res) {
    const isLogin = req.session.isLogin
    res.render('register', {isLogin})
}

function testimonials(req, res) {
    const isLogin = req.session.isLogin;
    const user = req.session.user;
    res.render('testimonials', {isLogin, user})
}

async function home(req, res) {
   
    // const id = req.session.user.id
    // console.log(id);
    // if(id) {
    //  const query = `select public.projects.id, public.projects.title, public.projects."startDate", public.projects."endDate", public.projects.description, public.projects.tech, public.projects.image, public.projects."createdAt", public.users.name from public.projects inner join public.users on public.users.id = public.projects.user_id where public.users.id = ${id}`
    // }
    
    const query = `select public.projects.id, public.projects.title, public.projects."startDate", public.projects."endDate", public.projects.description, public.projects.tech, public.projects.image, public.projects."createdAt", public.users.name from public.projects inner join public.users on public.users.id = public.projects.user_id`

    // const query = `select id, title, "startDate", "endDate", description, tech, image from projects`;
    const obj = await sequelize.query(query, {type: QueryTypes.SELECT})

        const projects = obj.map((project) => {
        const getTech = project.tech;
        const react = getTech.includes('React Js') ? '<i class="fa-brands fa-react fa-2x" style="font-size:30px" ></i>': null;
        const node = getTech.includes('Node Js') ? '<i class="fa-brands fa-node fa-2x" style="font-size:30px"></i>': null;
        const next = getTech.includes('Next Js') ? '<img src="../assets/img/next.png" alt="image-nextjs" style="height: 20px; width: 20px" />': null;
        const ts = getTech.includes('TypeScript') ? '<img src="../assets/img/typescript.png"  alt="image-ts" style="height: 20px; width: 20px"/>': null;

        return {
            ...project,
            duration: calculateDate(project.startDate, project.endDate),
            react,
            node,
            next,
            ts,
        }
    })

    console.log(projects)

    const isLogin = req.session.isLogin
    const user = req.session.user
   
    res.render('index', {projects, user, isLogin});
}

async function project(req, res) {
    const data = await projectModel.findAll();
    const isLogin = req.session.isLogin
    const user = req.session.user

    res.render('project', {isLogin, user});
}

function contact(req, res) {
    const isLogin = req.session.isLogin
    const user = req.session.user

    res.render('contact-form', {isLogin, user});
}


async function projectDetail(req, res) {
    const {id} = req.params;
    //array of object
    // const myproject = dataProject[id];
    // if(!myproject) {
    //     return console.log('item pada myproject tidak ada');
    // }
    // console.log(myproject);

    //query select
    const query = `select public.projects.id, public.projects.title, public.projects."startDate", public.projects."endDate", public.projects.description, public.projects.tech, public.projects.image, public.projects."createdAt", public.users.name from public.projects inner join public.users on public.users.id = public.projects.user_id where public.projects.id = ${id}`
    const myproject = await sequelize.query(query, {type : QueryTypes.SELECT})
    const project = {
        // ...myproject,
        ...myproject[0],
        duration: calculateDate(myproject[0].startDate, myproject[0].endDate),
        react : myproject[0].tech.includes('React Js') ? '<div><i class="fa-brands fa-react" size="20"></i> <span>React Js</span></div>': null,
        node  :myproject[0].tech.includes('Node Js') ? '<div><i class="fa-brands fa-node" size="20"></i> <span>Node Js</span></div>' : null,
        next : myproject[0].tech.includes('Next Js') ? '<div><img src="../assets/img/next.png" alt="image-nextjs" style="height: 25px; width: 25px" /> <span>Next Js</span></div>': null,
        ts : myproject[0].tech.includes('TypeScript') ? '<div><img src="../assets/img/typescript.png"  alt="image-ts" style="height: 25px; width: 25px"/> <span>TypeScript</span></div>': null
    }
    
 
    //orm
    // const myproject = await projectModel.findOne({
    //     where: {id}
    // })


    console.log(project)
    const isLogin = req.session.isLogin
    const user = req.session.user

    res.render('detail-project', { project, isLogin, user});
}

//proses insert
async function addProject(req, res) {
    const {projectName, startDate, endDate, description, tech} = req.body;
    if(projectName === '' || startDate === '' || endDate === '' || description === '' || !tech) {
        return console.log('Lengkapi semua kolom yang kosong');
    }

    // dataProject.push({
    //     title : projectName, 
    //     startDate,
    //     endDate,
    //     description,
    //     tech,
    //     image : 'image-1714876793165-856097538.jpg'
    // });

    // console.log(dataProject)

    // const query = `insert into projects(title, "startDate", "endDate", description, tech, image, "createdAt", "updatedAt") values('${projectName}', '${startDate}', '${endDate}', '${description}', '${tech}', 'https://a.slack-edge.com/9c84081/marketing/img/solutions/tech/png/billboard.png', now(), now())`;
    // const project = await sequelize.query(query, {type :QueryTypes.INSERT});

    const getImage = req.file.filename
    // const userId = req.session.user.id

    await projectModel.create({
        title : projectName,
        startDate,
        endDate, 
        description,
        tech,
        // image : 'https://a.slack-edge.com/9c84081/marketing/img/solutions/tech/png/billboard.png',
        image : getImage,
        user_id: 6
    })
    
    // console.log(project);
    res.redirect('/');
    // return project;
}

//proses delete
async function deleteProject(req, res) {
  const {id} = req.params;
//   dataProject.splice(id, 1);
//   console.log(projects);

//   const query = `delete from projects where id=${id}`
//   const project = await sequelize.query(query, {type : QueryTypes.DELETE})

const project = await projectModel.destroy({
    where : {id}
})

  res.redirect('/');
}

//proses update
async function editProject(req, res) {
    const {id} = req.params;
    // console.log(req.file);
    const {projectName, startDate, endDate, description, tech} = req.body;
    // dataProject[id] = {
    //     title : projectName, 
    //     startDate,
    //     endDate,
    //     description,
    //     tech,
    //     image : 'image-1714876793165-856097538.jpg'
    // }

    // const query = `update projects SET title='${projectName}',  "startDate"='${startDate}', "endDate"='${endDate}', description='${description}', tech='${tech}', image='${image}' where id=${id}`
    // const data = await sequelize.query(query, {type : QueryTypes.UPDATE})

    const data = await projectModel.update(
        {
            title: projectName,
            startDate,
            endDate,
            description,
            tech,
            image : req.file.filename
        },
        { where: { id: id } }
    ) 
    
    // res.json('ok');
    res.redirect('/');
}

async function editProjectView(req, res) {
    const {id} = req.params;
    // const respon = dataProject[id]

    const query = `select * from projects where id=${id}`
    const respon = await sequelize.query(query, {type : QueryTypes.SELECT})
    const data = {
        // ...respon,
        ...respon['0'],
        react : respon['0'].tech.includes('React Js') ? 'checked' : '',
        node : respon['0'].tech.includes('Node Js') ? 'checked' : '',
        next : respon['0'].tech.includes('Next Js') ? 'checked' : '',
        ts : respon['0'].tech.includes('TypeScript') ? 'checked' : '',
        
    }

    const user = req.session.user
    const isLogin = req.session.isLogin

    res.render('edit-project', {data, user, isLogin})
}

app.listen(port, server)
function server(){
    console.log('server is running on port: ' + port);
} 