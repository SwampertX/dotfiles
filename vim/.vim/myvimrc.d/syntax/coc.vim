if exists("b:current_syntax")
  finish
endif

" syn match schemeParentheses "[^ '`\t\n()\[\]";]\+"
" syn match schemeParentheses "[)\]]"

" syn match cocIdentifier /[a-zA-Z][a-zA-Z0-9]*/ contained

" syn match cocLambda /(/
" syn match cocLambda /)/
" syn match cocForall /{/
" syn match cocForall /}/
" syn match cocType /:/
" syn match cocType /\./

syn match comments "\/\/.*$"
" syn region multilinecomments start="/*" end="*/" contains=multilinecomments
if exists("c_comment_strings")
  " A comment can contain cString, cCharacter and cNumber.
  " But a "*/" inside a cString in a cComment DOES end the comment!  So we
  " need to use a special type of cString: cCommentString, which also ends on
  " "*/", and sees a "*" at the start of the line as comment again.
  " Unfortunately this doesn't very well work for // type of comments :-(
  syn match	cCommentSkip	contained "^\s*\*\($\|\s\+\)"
  syn region cCommentString	contained start=+L\=\\\@<!"+ skip=+\\\\\|\\"+ end=+"+ end=+\*/+me=s-1 contains=cSpecial,cCommentSkip
  syn region cComment2String	contained start=+L\=\\\@<!"+ skip=+\\\\\|\\"+ end=+"+ end="$" contains=cSpecial
  syn region  cCommentL	start="//" skip="\\$" end="$" keepend contains=@cCommentGroup,cComment2String,cCharacter,cNumbersCom,cSpaceError,cWrongComTail,@Spell
  if exists("c_no_comment_fold")
    " Use "extend" here to have preprocessor lines not terminate halfway a
    " comment.
    syn region cComment	matchgroup=cCommentStart start="/\*" end="\*/" contains=@cCommentGroup,cCommentStartError,cCommentString,cCharacter,cNumbersCom,cSpaceError,@Spell extend
  else
    syn region cComment	matchgroup=cCommentStart start="/\*" end="\*/" contains=@cCommentGroup,cCommentStartError,cCommentString,cCharacter,cNumbersCom,cSpaceError,@Spell fold extend
  endif
else
  syn region	cCommentL	start="//" skip="\\$" end="$" keepend contains=@cCommentGroup,cSpaceError,@Spell
  if exists("c_no_comment_fold")
    syn region	cComment	matchgroup=cCommentStart start="/\*" end="\*/" contains=@cCommentGroup,cCommentStartError,cSpaceError,@Spell extend
  else
    syn region	cComment	matchgroup=cCommentStart start="/\*" end="\*/" contains=@cCommentGroup,cCommentStartError,cSpaceError,@Spell fold extend
  endif
endif
" keep a // comment separately, it terminates a preproc. conditional
syn match	cCommentError	display "\*/"
syn match	cCommentStartError display "/\*"me=e-1 contained
syn match	cWrongComTail	display "\*/"

hi def link cCommentL		Comment
hi def link cCommentStart	Comment
hi def link cCommentError	Error
hi def link cCommentStartError	Error
hi def link cCommentString	Normal
hi def link cComment2String	Normal
hi def link cCommentSkip	Comment
hi def link cComment		Comment

syn region defblock matchgroup=equalkeyword start=/=/ end=/;/ contains=comments,multilinecomments,typeannotation,lambda,forall fold

syn region typeannotation matchgroup=tannot start=/:/          end=/\./ contains=ALLBUT,lparen,fparen contained
syn region lambda         matchgroup=lpparen start=/(\(\\\)\@=/ end=/)/  contains=ALLBUT,tparen,fparen contained fold
syn region forall         matchgroup=fpparen start=/{\(\\\)\@=/ end=/}/  contains=ALLBUT,tparen,lparen contained fold
syn region tparen         matchgroup=tppparen  start=/(\(\\\)\@!/ end=/)/  contains=ALLBUT,lparen,fparen contained fold
syn region lparen         matchgroup=lppparen  start=/(\(\\\)\@!/ end=/)/  contains=ALLBUT,tparen,fparen contained fold
syn region fparen         matchgroup=fppparen  start=/(\(\\\)\@!/ end=/)/  contains=ALLBUT,tparen,lparen contained fold

syn match forall "->" display

hi def link comments Comment
hi def link multilinecomments Comment

hi def link typeannotationboundary Normal
hi def link typeannotation Type
hi def link tparen Type
hi def link lambda Function
hi def link lparen Function
hi def link lpparen String
hi def link lppparen Normal
hi def link forall String
hi def link fparen String
hi def link fpparen Function
hi def link fppparen normal
hi def link paren Normal

syn iskeyword @,48-57,192-255,$,_,42
syn keyword cocImport import
syn keyword cocImportAs as
syn keyword cocProp Prop
syn keyword cocProp2 *
syn keyword cocDefine define
" syn keyword cocType Type

hi def link cocIdentifier Normal
hi def link cocMalformedIdentifier Error
" hi def link schemeParentheses Todo
hi def link cocImport Include
hi def link cocImportAs Include
hi def link cocProp Type
hi def link cocProp2 Type
hi def link cocDefine Statement
hi def link equalkeyword Statement
hi def link defnameblock Normal
hi def link defblock Function
" hi def link cocDefine Statement
" hi def link cocLambda Function
" hi def link cocForall Type
