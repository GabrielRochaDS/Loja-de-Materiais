package com.lojamateriais.apirestful.service;

import com.lojamateriais.apirestful.model.Usuario;
import com.lojamateriais.apirestful.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario cadastrarUsuario(Usuario usuario) {
        // Verifica se o usuário já existe
        if (usuarioRepository.existsByConta(usuario.getConta())) {
            throw new RuntimeException("Usuário já cadastrado com esta conta.");
        }
        String email = usuario.getConta();

        if (!email.matches("^[\\w.+-]+@[\\w-]+\\.[\\w.-]+$")) {
            throw new RuntimeException("A conta deve ser um e-mail válido.");
        }

        // Salva o novo usuário
        return usuarioRepository.save(usuario);
    }

    public Usuario login(Usuario usuario) {
        return usuarioRepository.findByContaAndSenha(
                usuario.getConta(), usuario.getSenha());
    }
}
