import handlebars from 'handlebars'
import fs from 'fs-extra'
import {fileURLToPath} from 'url';
import {resolve, dirname} from 'path';
import moment from 'moment';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(dirname(__filename), '../');

export function render(resume: Record<string, unknown>, locale?: string | undefined): string {
  const template = fs.readFileSync(__dirname +'/resume.hbs', 'utf8')
  const css = fs.readFileSync(__dirname + '/assets/theme.css', 'utf-8')

  handlebars.registerHelper('toSocialIcon', function (text) {
    switch(text){
      case 'GitHub':
        return 'ri:github-fill';
      case 'LinkedIn':
        return 'ri:linkedin-fill';
      case 'Twitter':
        return 'ri:twitter-fill';
      case 'maston':
        return 'ri:mastodon-fill';
      case 'blog':
        return 'ri:article-line';
      case 'link':
          return 'ri:link';
      default:
        return '';
    }
  })

  handlebars.registerHelper('toLocaleTitle', (text) => {
    const isCn = locale === 'cn';
    switch(text){
      case 'summary':
        return isCn ? '关于我' : 'SUMMARY';
      case 'work_experience':
        return isCn ? '工作经历' : 'WORK EXPERIENCE';
      case 'projects':
        return isCn ? '项目经历' : 'PROJECTS';
      case 'stacks':
        return isCn ? '技术栈' : 'STACKS';
      case 'education':
        return isCn ? '教育背景' : 'EDUCATION';
      case 'languages':
        return isCn ? '语言能力' : 'LANGUAGES';
      default:
        return text;
    }
  })

  handlebars.registerHelper('getPdfLinks', () => {
    const link = locale === 'cn'
      ? 'https://keith-resume.netlify.app/resume-cn.pdf'
      : 'https://keith-resume.netlify.app/resume.pdf';
    
    return link;
  })
  handlebars.registerHelper('getOnlineLinks', () => {
    const link = locale === 'cn'
      ? 'https://keith-resume.netlify.app/resume-cn.pdf'
      : 'https://keith-resume.netlify.app/resume.pdf';
    
    return link;
  })

  handlebars.registerHelper('join', function (arr) {
    return arr.join(', ')
  })

  handlebars.registerHelper('getGithubApi', () => {})

  handlebars.registerHelper('breaklines', function(text) {
    text = text.replace(/(\n\r)/g, '<br>')
    return new handlebars.SafeString(text)
  })

  handlebars.registerHelper('getBuildDate', function(date) {
    if (!date) {
      return
    }

    return moment(new Date(date)).format('MMM YYYY')
  
  })

  return handlebars.compile(template)({
    resume: resume,
    css: css
  });
}

