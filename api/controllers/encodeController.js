exports.encode = async (req, res, next)=>{
    try
    {
        function shiftCipherChar(char, shift) {
            const alphabet = [
                'A','B','C','D','E','F',
                'G','H','I','J','K','L',
                'M','N','O','P','Q','R',
                'S','T','U','V','W','X',
                'Y','Z'
              ];
        
            try
            {
                if (alphabet.includes(char.toUpperCase()))
                { 
                  const position = alphabet.indexOf(char.toUpperCase());
                  const newPosition = (position + shift)%26;
                  return alphabet[newPosition];
                }
                else 
                { 
                    return char; 
                }
            
            }
            catch(ex)
            {
                console.log(ex);
                return "a";
            }
        }

        let p_shift = req.body.Shift; 
        let p_message = req.body.Message; 
        let shiftCipherMessage = '';

        let p = p_message.split('');
        for(let i = 0; i < p.length; i++)
        {
            var chn = p[i];
            if(chn === " "){
                shiftCipherMessage += " ";
                continue;
            }
            var chx = shiftCipherChar(chn, p_shift);
            shiftCipherMessage += chx;
        }

        shiftCipherMessage = shiftCipherMessage.toLowerCase();

        let fs = require('fs');
        let fileName = Date.now() + '.txt';
        fs.writeFile(fileName, shiftCipherMessage, function (err) {
          if (err) throw err;
        });

        const r = { EncodedMessage : shiftCipherMessage };
        res.status(200).json(r);
    }
    catch(error)
    {
        res.status(200).json({EncodedMessage: ""});
    }
}

