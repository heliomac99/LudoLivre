from marshmallow import Schema, fields

class UsuarioLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True)

class UsuarioCadastroSchema(Schema):
    nome = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True)

class UsuarioRespostaSchema(Schema):
    id = fields.Int(required=True)
    nome = fields.Str(required=True)
    email = fields.Email(required=True)
    tipoUsuarioIds = fields.List(fields.Int(), required=True)
