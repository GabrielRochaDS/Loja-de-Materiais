package com.lojamateriais.apirestful.controller;

import com.lojamateriais.apirestful.model.Usuario;
import com.lojamateriais.apirestful.service.AutenticacaoService;
import com.lojamateriais.apirestful.util.TokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("autenticacao")   // http://localhost:8080/autenticacao
public class AutenticacaoController {

    @Autowired
    private AutenticacaoService autenticacaoService;

    @PutMapping
    public Usuario cadastrarUsuario(@RequestBody Usuario usuario) {
        return autenticacaoService.cadastrarUsuario(usuario);
    }

    @PostMapping("login")  // http://localhost:8080/autenticacao/login
    public TokenResponse login(@RequestBody Usuario usuario) {
        Usuario usuarioLogado = autenticacaoService.login(usuario);
        if (usuarioLogado != null) {
            return new TokenResponse(usuarioLogado.getId());
        } else {
            return new TokenResponse(0);
        }
    }
}
