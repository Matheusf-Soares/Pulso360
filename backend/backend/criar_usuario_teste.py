"""
Script para criar usuário de teste no banco de dados.
Execute: python -m backend.criar_usuario_teste
"""

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from core.configs import settings
from core.security import generate_hash_password
from models.usuario_model import Usuario
from models.base.base_model import Base


async def criar_usuario_teste():
    """Cria um usuário de teste no banco de dados."""
    
    # Criar engine
    engine = create_async_engine(
        settings.DB_URL,
        echo=True,
        future=True
    )
    
    # Criar todas as tabelas
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # Criar sessão
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    
    async with async_session() as session:
        try:
            # Verificar se usuário já existe
            from sqlalchemy import select
            result = await session.execute(
                select(Usuario).where(Usuario.email == "admin@pulso360.com")
            )
            existing_user = result.scalar_one_or_none()
            
            if existing_user:
                print("✅ Usuário de teste já existe!")
                print(f"   Email: {existing_user.email}")
                print(f"   Nome: {existing_user.nome}")
                return
            
            # Criar usuário de teste
            senha_hash = generate_hash_password("admin123")
            
            usuario_teste = Usuario(
                nome="Administrador",
                email="admin@pulso360.com",
                senha_hash=senha_hash,
                cargo="Administrador do Sistema",
                senioridade="Sênior",
                ativo=True
            )
            
            session.add(usuario_teste)
            await session.commit()
            
            print("\n" + "="*60)
            print("✅ Usuário de teste criado com sucesso!")
            print("="*60)
            print(f"   Email: admin@pulso360.com")
            print(f"   Senha: admin123")
            print(f"   Nome: {usuario_teste.nome}")
            print(f"   ID: {usuario_teste.id}")
            print("="*60)
            print("\nVocê pode usar estas credenciais para fazer login no sistema.")
            print("="*60 + "\n")
            
        except Exception as e:
            print(f"❌ Erro ao criar usuário de teste: {e}")
            await session.rollback()
    
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(criar_usuario_teste())
