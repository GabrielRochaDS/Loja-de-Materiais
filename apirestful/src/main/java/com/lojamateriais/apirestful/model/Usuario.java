package com.lojamateriais.apirestful.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "A 'Conta' deve ser informada.")
    private String conta;
    @NotEmpty(message = "A 'Senha' deve ser informada.")
    private String senha;

    public Usuario(String conta, String senha) {
        this.conta = conta;
        this.senha = senha;
    }
}
