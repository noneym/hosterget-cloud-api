import { getGitHubClient } from './github-helper';
import { execSync } from 'child_process';

interface RepoConfig {
  name: string;
  description: string;
  private: boolean;
}

async function createGitHubRepo(config: RepoConfig) {
  try {
    console.log('🔗 GitHub\'a bağlanılıyor...');
    const octokit = await getGitHubClient();
    
    // Get authenticated user
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`✓ GitHub kullanıcısı: ${user.login}`);
    
    // Check if repo already exists
    try {
      await octokit.repos.get({
        owner: user.login,
        repo: config.name,
      });
      console.log(`⚠️  Repository zaten mevcut: ${user.login}/${config.name}`);
      return `https://github.com/${user.login}/${config.name}`;
    } catch (error: any) {
      if (error.status !== 404) {
        throw error;
      }
      // Repo doesn't exist, continue with creation
    }
    
    console.log('📦 Repository oluşturuluyor...');
    const { data: repo } = await octokit.repos.createForAuthenticatedUser({
      name: config.name,
      description: config.description,
      private: config.private,
      auto_init: false,
    });
    
    console.log(`✓ Repository oluşturuldu: ${repo.html_url}`);
    
    // Configure git
    console.log('\n🔧 Git yapılandırması...');
    try {
      execSync('git config user.email "replit@example.com"', { stdio: 'pipe' });
      execSync('git config user.name "Replit User"', { stdio: 'pipe' });
    } catch (e) {
      // Git config may already be set
    }
    
    // Add all files
    console.log('📝 Dosyalar ekleniyor...');
    execSync('git add -A', { stdio: 'inherit' });
    
    // Commit
    console.log('💾 Commit yapılıyor...');
    try {
      execSync('git commit -m "Initial commit: HosterGet Cloud API Platform"', { stdio: 'inherit' });
    } catch (e) {
      console.log('ℹ️  Zaten commit edilmiş dosyalar var, devam ediliyor...');
    }
    
    // Add remote
    console.log('🌐 Remote repository ekleniyor...');
    try {
      execSync('git remote remove origin', { stdio: 'pipe' });
    } catch (e) {
      // Remote may not exist
    }
    execSync(`git remote add origin ${repo.clone_url}`, { stdio: 'inherit' });
    
    // Push to GitHub
    console.log('🚀 GitHub\'a push yapılıyor...');
    execSync('git push -u origin main --force', { stdio: 'inherit' });
    
    console.log('\n✅ Proje başarıyla GitHub\'a aktarıldı!');
    console.log(`🔗 Repository URL: ${repo.html_url}`);
    
    return repo.html_url;
  } catch (error: any) {
    console.error('❌ Hata:', error.message);
    if (error.response) {
      console.error('Detay:', error.response.data);
    }
    throw error;
  }
}

// Main execution
const config: RepoConfig = {
  name: process.argv[2] || 'hosterget-cloud-api',
  description: 'Enterprise-grade Cloud API Platform - GPU Rental, Face Analysis & Identity Verification Services with Stripe Integration',
  private: false, // Set to true if you want a private repository
};

console.log('🚀 HosterGet Cloud API Platform - GitHub Repository Oluşturucu\n');
console.log(`Repository Adı: ${config.name}`);
console.log(`Açıklama: ${config.description}`);
console.log(`Görünürlük: ${config.private ? 'Private' : 'Public'}\n`);

createGitHubRepo(config)
  .then((url) => {
    console.log(`\n✨ İşlem tamamlandı! Repository: ${url}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 İşlem başarısız oldu:', error.message);
    process.exit(1);
  });
