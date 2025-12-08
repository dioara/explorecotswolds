# Railway Deployment Guide - Explore Cotswolds

## Step-by-Step Deployment Instructions

### Step 1: Create Railway Account & Project

1. **Go to Railway.app**
   - Visit https://railway.app
   - Click "Start a New Project"
   - Sign in with GitHub (use your dioara account)

2. **Create New Project**
   - Click "Deploy from GitHub repo"
   - Select `dioara/explorecotswolds` from the list
   - Railway will automatically detect it as a Node.js project

### Step 2: Add MySQL Database

1. **Add Database Service**
   - In your Railway project dashboard, click "+ New"
   - Select "Database" → "Add MySQL"
   - Railway will automatically provision a MySQL database
   - The database will be created with a random name

2. **Verify Database Connection**
   - Click on the MySQL service
   - Go to "Variables" tab
   - You should see `MYSQL_URL` and other database variables
   - Railway automatically connects these to your app

### Step 3: Configure Environment Variables

Railway automatically sets up the database connection, but verify:

1. **Check Variables**
   - Click on your `explorecotswolds` service (not the database)
   - Go to "Variables" tab
   - You should see `DATABASE_URL` automatically linked from MySQL service
   
2. **If DATABASE_URL is missing:**
   - Click "New Variable"
   - Select "Add Reference"
   - Choose MySQL service → `MYSQL_URL`
   - Name it `DATABASE_URL`

### Step 4: Configure Build & Deploy Settings

1. **Build Settings** (usually auto-detected)
   - Build Command: `pnpm install && pnpm build`
   - Start Command: `pnpm start`
   
2. **If you need to set manually:**
   - Go to "Settings" tab
   - Scroll to "Build"
   - Set Build Command: `pnpm install && pnpm build`
   - Set Start Command: `pnpm start`

3. **Set Root Directory** (if needed)
   - Root Directory: `/` (leave as default)

### Step 5: Deploy the Application

1. **Trigger Deployment**
   - Railway will automatically deploy when you connected the repo
   - If not, click "Deploy" button
   - Watch the build logs in the "Deployments" tab

2. **Wait for Build to Complete**
   - This will take 3-5 minutes
   - You'll see logs showing:
     - Installing dependencies
     - Building client
     - Starting server
   - Look for "✓ Deployment successful"

3. **Get Your App URL**
   - Once deployed, Railway provides a URL like: `explorecotswolds-production.up.railway.app`
   - Click "Settings" → "Networking" → "Generate Domain" if not auto-generated

### Step 6: Run Database Migrations

**Option A: Using Railway CLI (Recommended)**

1. **Install Railway CLI on your local machine:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Link to your project:**
   ```bash
   railway link
   # Select your explorecotswolds project
   ```

4. **Run migrations:**
   ```bash
   railway run pnpm db:push
   ```

**Option B: Using Railway Dashboard**

1. **Open your project in Railway**
2. **Click on the `explorecotswolds` service**
3. **Go to "Settings" tab**
4. **Scroll down to "Deploy Triggers"**
5. **Click "Add Custom Start Command"**
6. **Temporarily change start command to:**
   ```bash
   pnpm db:push && pnpm start
   ```
7. **Redeploy** (this will run migrations on startup)
8. **After successful deployment, change back to:**
   ```bash
   pnpm start
   ```

### Step 7: Seed the Database

**Option A: Using Railway CLI (Recommended)**

1. **Seed Cotswolds data:**
   ```bash
   railway run pnpm tsx server/cotswolds-seed.ts
   ```

2. **Seed blog posts:**
   ```bash
   railway run pnpm tsx server/seed-blog.ts
   ```

**Option B: Using Railway Dashboard Console**

1. **Open your project in Railway**
2. **Click on the `explorecotswolds` service**
3. **Click on "..." menu → "View Logs"**
4. **Switch to "Console" tab** (if available)
5. **Run commands:**
   ```bash
   pnpm tsx server/cotswolds-seed.ts
   pnpm tsx server/seed-blog.ts
   ```

**Option C: Temporary Deployment Script**

1. **Add a one-time seed script to package.json:**
   - Edit package.json locally
   - Add to scripts section:
     ```json
     "seed-production": "tsx server/cotswolds-seed.ts && tsx server/seed-blog.ts"
     ```
   - Commit and push to GitHub

2. **Update Railway start command temporarily:**
   ```bash
   pnpm seed-production && pnpm start
   ```

3. **Redeploy** (seeds will run once)

4. **Change start command back to:**
   ```bash
   pnpm start
   ```

### Step 8: Configure Custom Domain

1. **Go to Railway Dashboard**
   - Click on your `explorecotswolds` service
   - Go to "Settings" tab
   - Scroll to "Networking" section

2. **Add Custom Domain**
   - Click "Add Custom Domain"
   - Enter: `explorecotswolds.com`
   - Railway will provide DNS instructions

3. **Update DNS Records** (at your domain registrar)
   - Add CNAME record:
     - Name: `@` or leave blank
     - Value: `explorecotswolds-production.up.railway.app` (your Railway domain)
   - Or use A record if CNAME doesn't work for root domain:
     - Railway will provide the IP address

4. **Add www subdomain** (optional)
   - Add another custom domain: `www.explorecotswolds.com`
   - Add CNAME record:
     - Name: `www`
     - Value: `explorecotswolds-production.up.railway.app`

5. **Wait for DNS Propagation**
   - Can take 5 minutes to 48 hours
   - Usually works within 15-30 minutes

6. **SSL Certificate**
   - Railway automatically provisions SSL certificates
   - Your site will be accessible via HTTPS

### Step 9: Verify Deployment

1. **Visit your Railway URL**
   - Go to the generated Railway domain
   - Check that the site loads correctly

2. **Verify Images**
   - Check that all images are displaying
   - Visit /explore to see attraction images
   - Visit homepage to see hero image

3. **Verify Database**
   - Check that attractions, restaurants, hotels are showing
   - Search functionality should work
   - Blog posts should be accessible at /blog

4. **Test Functionality**
   - Search for "Blenheim"
   - Navigate to different pages
   - Check contact form
   - Verify all links work

### Step 10: Monitor & Maintain

1. **View Logs**
   - Click on your service → "Deployments" tab
   - Click on latest deployment to see logs
   - Monitor for any errors

2. **Check Metrics**
   - Railway provides usage metrics
   - Monitor CPU, Memory, Network usage

3. **Auto-Deployments**
   - Railway automatically deploys when you push to GitHub
   - Every push to master branch triggers a new deployment

## Quick Command Reference

### Railway CLI Commands

```bash
# Install CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Run migrations
railway run pnpm db:push

# Seed database
railway run pnpm tsx server/cotswolds-seed.ts
railway run pnpm tsx server/seed-blog.ts

# View logs
railway logs

# Open project in browser
railway open
```

## Troubleshooting

### Issue: Build Fails

**Solution:**
- Check build logs in Railway dashboard
- Verify package.json has correct scripts
- Ensure all dependencies are listed

### Issue: Database Connection Error

**Solution:**
- Verify DATABASE_URL is set in environment variables
- Check MySQL service is running
- Ensure DATABASE_URL format is correct: `mysql://user:password@host:port/database`

### Issue: Images Not Loading

**Solution:**
- Verify images are in `public/images/` directory in GitHub
- Check that static file serving is configured (server/_core/vite.ts)
- Clear browser cache

### Issue: Seed Script Fails

**Solution:**
- Run migrations first: `railway run pnpm db:push`
- Check database connection
- Verify seed files exist in `server/` directory

### Issue: Domain Not Working

**Solution:**
- Verify DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Check Railway domain settings
- Try accessing via Railway-provided domain first

## Environment Variables Reference

Railway automatically sets these from MySQL service:

```
DATABASE_URL=mysql://user:password@host:port/database
MYSQL_URL=mysql://user:password@host:port/database
MYSQL_HOST=containers-us-west-xxx.railway.app
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=xxxxx
MYSQL_DATABASE=railway
```

## Estimated Costs

Railway offers:
- **Hobby Plan**: $5/month (500 hours of usage)
- **Pro Plan**: $20/month (more resources)
- **Free Trial**: $5 credit to start

For Explore Cotswolds:
- Estimated usage: ~$10-15/month
- Includes: Web service + MySQL database

## Support

If you encounter issues:
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Email: contact@lampstand.consulting

---

## Quick Start Summary

```bash
# 1. Create Railway project from GitHub
# 2. Add MySQL database
# 3. Wait for deployment
# 4. Install Railway CLI
npm i -g @railway/cli

# 5. Login and link
railway login
railway link

# 6. Run migrations
railway run pnpm db:push

# 7. Seed database
railway run pnpm tsx server/cotswolds-seed.ts
railway run pnpm tsx server/seed-blog.ts

# 8. Configure domain
# 9. Visit your site!
```

**That's it! Your Explore Cotswolds website will be live!** 🚀
