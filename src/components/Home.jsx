import React from 'react';
import NavBar from './NavBar';
import Post from './Post';
import NewPost from './NewPost';

export default function Home() {

  return (
    <div className="adminx-container">
      <NavBar type='company' />
      <div className="row adminx-content" >
        <div className="ml-5 col-6">
          <Post user="angipaola10" url="https://www.nationalgeographic.com.es/medio/2019/09/09/bull-dog-ingles_043b09e1_800x800.jpg" description="Mi primer post" />
          <Post user="angipaola10" url="https://www.fundacion-affinity.org/sites/default/files/el-gato-necesita-tener-acceso-al-exterior.jpg" description="Mi segundo post" />
          <Post user="angipaola10" url="https://www.hola.com/imagenes/estar-bien/20190410140226/mejores-razas-perro-defensa-personal-cs/0-666-608/perrodefensa-m.jpg" description="Mi tercer post" />
        </div>
        <div style={{ float: 'right', margin: "10px"}}>
          <div className="adminx-content col-5 position-fixed mt-2 p-5">
            <div className="cointainer align-items-center justify-content-center border-b pb-3 mb-5">
              <a href={"/users/"+localStorage.getItem('userName')} className="a-white"><strong><h1>{localStorage.getItem('userName')}</h1></strong></a> 
              <h5>{localStorage.getItem('typeUserLogged')}</h5>
            </div>
            <NewPost />
          </div>
        </div>
      </div>
    </div>
  );
}

