import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {config} from '../config/config';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const jwt = require('jsonwebtoken');

// Nuevas librerias
const generator = require("password-generator");
const cryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(@repository(UsuarioRepository)
  public usuarioRepository: UsuarioRepository) { }

  /*
   * Add service methods here
   */

  //Generacion de claves contraseña aleatoria
  GenerarClave() {
    let clave = generator(8, false);
    return clave;
  }

  // encripta la contraseña con el metodo MD5
  CifrarClave(clave: String) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  //Encriptar JWT similar alo que se coloca en Payload: Data
  GenerarTokenJWT(usuario: Usuario) {
    let token = jwt.sign({
      data: {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre + " " + usuario.apellido
      }
    }, config.claveJWT)

    return token
  }

  // desencriptar
  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, config.claveJWT);
      return datos;
    } catch (error) {
      return false;
    }
  }


  //Autenticacion -  servicio que nos permitirá validar la sesión de un usuario
  IdentificarPersona(correo: string, contrasena: string) {
    try {
      let p = this.usuarioRepository.findOne({where: {correo: correo, contrasena: contrasena}})
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }





}
