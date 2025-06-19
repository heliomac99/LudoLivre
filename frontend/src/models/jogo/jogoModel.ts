export interface JogoModel {
  id?: number;
  descricao: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  imagens: File[];
  wallpaper: File[];
  imagensBase64: string[];
  wallpaperBase64: string;
  nomeArquivoWallpaper: string;
  tags: string[];
}