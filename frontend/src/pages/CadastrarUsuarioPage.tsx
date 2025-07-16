import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// Esquema de validação com Zod
const cadastroSchema = z.object({
    conta: z.string()
        .min(1, "Email é obrigatório")
        .email("Email inválido"),
    senha: z.string()
        .min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmacaoSenha: z.string()
}).refine(data => data.senha === data.confirmacaoSenha, {
    message: "As senhas não coincidem",
    path: ["confirmacaoSenha"]
});

type CadastroFormData = z.infer<typeof cadastroSchema>;

const CadastrarUsuarioPage = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<CadastroFormData>({
        resolver: zodResolver(cadastroSchema)
    });

    const onSubmit = async (data: CadastroFormData) => {
        try {
            const response = await axios.put("http://localhost:8080/autenticacao", {
                conta: data.conta,
                senha: data.senha
            });

            if (response.data) {
                toast.success("Cadastro realizado com sucesso!");
                navigate("/login");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                setError("conta", {
                    type: "manual",
                    message: "Este email já está cadastrado"
                });
            } else {
                toast.error("Erro ao cadastrar usuário");
                console.error("Erro no cadastro:", error);
            }
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Cadastro de Usuário</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="conta" className="form-label">Email</label>
                            <input
                                {...register("conta")}
                                type="email"
                                id="conta"
                                className={`form-control ${errors.conta ? "is-invalid" : ""}`}
                                placeholder="seu@email.com"
                            />
                            {errors.conta && (
                                <div className="invalid-feedback">
                                    {errors.conta.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="senha" className="form-label">Senha</label>
                            <input
                                {...register("senha")}
                                type="password"
                                id="senha"
                                className={`form-control ${errors.senha ? "is-invalid" : ""}`}
                                placeholder="Mínimo 6 caracteres"
                            />
                            {errors.senha && (
                                <div className="invalid-feedback">
                                    {errors.senha.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmacaoSenha" className="form-label">Confirme sua Senha</label>
                            <input
                                {...register("confirmacaoSenha")}
                                type="password"
                                id="confirmacaoSenha"
                                className={`form-control ${errors.confirmacaoSenha ? "is-invalid" : ""}`}
                                placeholder="Digite a senha novamente"
                            />
                            {errors.confirmacaoSenha && (
                                <div className="invalid-feedback">
                                    {errors.confirmacaoSenha.message}
                                </div>
                            )}
                        </div>

                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => navigate("/login")}
                            >
                                Voltar para Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CadastrarUsuarioPage;