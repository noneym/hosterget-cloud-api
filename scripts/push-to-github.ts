import { getGitHubClient } from './github-helper';
import { execSync } from 'child_process';

async function pushToGitHub() {
  try {
    console.log('🔗 GitHub access token alınıyor...');
    const octokit = await getGitHubClient();
    
    // Get the authenticated user to verify token works
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`✓ GitHub kullanıcısı: ${user.login}`);
    
    // Get the access token from the environment
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY 
      ? 'repl ' + process.env.REPL_IDENTITY 
      : process.env.WEB_REPL_RENEWAL 
      ? 'depl ' + process.env.WEB_REPL_RENEWAL 
      : null;

    if (!xReplitToken) {
      throw new Error('X_REPLIT_TOKEN not found');
    }

    const connectionSettings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    ).then(res => res.json()).then(data => data.items?.[0]);

    const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

    if (!accessToken) {
      throw new Error('Access token alınamadı');
    }

    console.log('✓ Access token alındı');
    
    const repoUrl = `https://${accessToken}@github.com/${user.login}/hosterget-cloud-api.git`;
    
    // Configure git
    console.log('\n🔧 Git yapılandırması...');
    try {
      execSync(`git config user.email "${user.email || 'noreply@github.com'}"`, { stdio: 'pipe' });
      execSync(`git config user.name "${user.name || user.login}"`, { stdio: 'pipe' });
    } catch (e) {
      // Config may already be set
    }
    
    // Remove old remote and add new one with token
    console.log('🌐 Remote repository güncelleniyor...');
    try {
      execSync('git remote remove origin', { stdio: 'pipe' });
    } catch (e) {
      // Remote may not exist
    }
    execSync(`git remote add origin ${repoUrl}`, { stdio: 'pipe' });
    
    // Check if there's anything to commit
    console.log('📝 Değişiklikler kontrol ediliyor...');
    try {
      execSync('git add -A', { stdio: 'pipe' });
      try {
        execSync('git commit -m "Initial commit: HosterGet Cloud API Platform"', { stdio: 'pipe' });
        console.log('✓ Yeni commit oluşturuldu');
      } catch (e) {
        console.log('ℹ️  Commit edilecek yeni değişiklik yok');
      }
    } catch (e) {
      console.log('ℹ️  Git add işlemi tamamlandı');
    }
    
    // Push to GitHub
    console.log('🚀 GitHub\'a push yapılıyor...');
    try {
      execSync('git push -u origin main', { stdio: 'inherit' });
    } catch (e) {
      // Try force push if normal push fails
      console.log('⚠️  Normal push başarısız, force push deneniyor...');
      execSync('git push -u origin main --force', { stdio: 'inherit' });
    }
    
    console.log('\n✅ Proje başarıyla GitHub\'a push edildi!');
    console.log(`🔗 Repository: https://github.com/${user.login}/hosterget-cloud-api`);
    
  } catch (error: any) {
    console.error('❌ Hata:', error.message);
    if (error.stderr) {
      console.error('Detay:', error.stderr.toString());
    }
    throw error;
  }
}

console.log('🚀 HosterGet Cloud API Platform - GitHub Push\n');

pushToGitHub()
  .then(() => {
    console.log('\n✨ İşlem tamamlandı!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 İşlem başarısız oldu:', error.message);
    process.exit(1);
  });
