
export const validateEmail = (email) => {
    return email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const validateCpf = (cpf) => {
    let Soma;
    let Resto;
    Soma = 0;
    if (cpf === "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11))  Resto = 0;
    if (Resto !== parseInt(cpf.substring(9, 10), 10)) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11))  Resto = 0;
    return Resto === parseInt(cpf.substring(10, 11), 10);

};

export const validateTelephone = (telephone) => {
    return telephone && !isNaN(telephone) && (telephone.length === 11 || telephone.length === 10);
};

export const validatePassword = (pass) => {
    return pass && pass.length >= 6;
};

export const validateSamePass = (pass, samePass) => {
    return pass === samePass;
};

export const validateNotEmpty = (str) => {
    return str || str.length > 0;
};